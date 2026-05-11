"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

interface SheetInfo {
  name: string;
  rows: number;
  status: "pending" | "processing" | "success" | "error";
}

const expectedSheets = ["SD4", "PLANO", "SOLICITAR", "MATR120"];

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sheets, setSheets] = useState<SheetInfo[]>(
    expectedSheets.map(name => ({
      name,
      rows: 0,
      status: "pending"
    }))
  );
  const [uploadComplete, setUploadComplete] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    try {
      // Simulate file processing with progress
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Simulate sheet processing
      const updatedSheets = sheets.map((sheet, index) => ({
        ...sheet,
        status: "processing" as const,
        rows: Math.floor(Math.random() * 500) + 50
      }));
      setSheets(updatedSheets);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mark all sheets as success
      const finalSheets = updatedSheets.map(sheet => ({
        ...sheet,
        status: "success" as const
      }));
      setSheets(finalSheets);
      setUploadComplete(true);
      setUploadProgress(100);

      // Reset after 2 seconds
      setTimeout(() => {
        setFiles([]);
        setUploadProgress(0);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setSheets(sheets.map(sheet => ({
        ...sheet,
        status: "error"
      })));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload de Planilha</h1>
        <p className="text-muted-foreground mt-2">
          Importe seus dados Excel para atualizar o banco de dados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selecionar Arquivo</CardTitle>
              <CardDescription>
                Arraste uma planilha Excel ou clique para selecionar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {isDragActive ? (
                  <p className="text-lg font-semibold">Solte a planilha aqui...</p>
                ) : (
                  <>
                    <p className="text-lg font-semibold">
                      Arraste a planilha aqui ou clique para selecionar
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formatos aceitos: .xlsx, .xls
                    </p>
                  </>
                )}
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between p-4 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <File className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      {uploading ? (
                        <Badge variant="secondary">Processando...</Badge>
                      ) : uploadComplete ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Sucesso
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pronto</Badge>
                      )}
                    </div>
                  ))}

                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-semibold">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full"
                    size="lg"
                  >
                    {uploading ? "Enviando..." : "Enviar Planilha"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Import Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Importação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Abas esperadas:</strong> SD4, PLANO, SOLICITAR, MATR120
                </p>
                <p>
                  <strong>Formato:</strong> Excel (.xlsx ou .xls)
                </p>
                <p>
                  <strong>Processamento:</strong> Os dados serão cruzados automaticamente
                </p>
                <p className="text-muted-foreground">
                  Certifique-se de que seu arquivo contém todas as abas necessárias
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sheets Status */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status das Abas</CardTitle>
              <CardDescription>
                Abas que serão processadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sheets.map((sheet) => (
                <div
                  key={sheet.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm">{sheet.name}</p>
                    {sheet.rows > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {sheet.rows} linhas
                      </p>
                    )}
                  </div>
                  {sheet.status === "pending" && (
                    <Badge variant="outline">Pendente</Badge>
                  )}
                  {sheet.status === "processing" && (
                    <Badge variant="secondary">Processando</Badge>
                  )}
                  {sheet.status === "success" && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {sheet.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

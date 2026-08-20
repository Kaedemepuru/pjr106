# 简易静态文件服务器，监听 http://localhost:5500
$root = Split-Path $PSScriptRoot -Parent
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:5500/")
$listener.Start()
Write-Host "服务器已启动: http://localhost:5500/" -ForegroundColor Green
Write-Host "按 Ctrl+C 停止" -ForegroundColor Yellow

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.webp' = 'image/webp'
  '.gif'  = 'image/gif'
  '.mp4'  = 'video/mp4'
  '.txt'  = 'text/plain; charset=utf-8'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response

  $path = $req.Url.AbsolutePath
  if ($path -eq '/') { $path = '/webcode/index.html' }
  $file = Join-Path $root $path.TrimStart('/')

  if (Test-Path $file -PathType Leaf) {
    $ext  = [System.IO.Path]::GetExtension($file).ToLower()
    $mime = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { 'application/octet-stream' }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $res.ContentType   = $mime
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $res.OutputStream.Write($msg, 0, $msg.Length)
  }
  $res.OutputStream.Close()
}

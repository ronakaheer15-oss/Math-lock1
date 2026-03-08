$file = "c:\Users\HP\Downloads\mathlock-vercel\src\MathLock.jsx"
$lines = Get-Content $file
$keep = @()
$keep += $lines[0..5]
$keep += $lines[620..($lines.Length - 1)]
$keep | Set-Content $file -Encoding UTF8
Write-Host "Done. Removed inline ROADMAP lines 7-619."

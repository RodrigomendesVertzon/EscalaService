$ErrorActionPreference = 'Stop'
$loginBody = @{ email='admin@freelancer.com'; password='DevAdmin2026!TroqueEstaSenha' } | ConvertTo-Json
$login = Invoke-RestMethod -Method POST -Uri 'http://localhost:3001/v1/auth/login' -ContentType 'application/json' -Body $loginBody
$TOKEN = $login.accessToken
if (-not $TOKEN) { throw 'Auth nao retornou accessToken' }
$headers = @{ Authorization="Bearer $TOKEN"; 'X-Correlation-Id'='escala-fluxo-001' }
$inicio = (Get-Date).AddDays(3).Date.AddHours(8).ToString('yyyy-MM-ddTHH:mm:sszzz')
$fim = (Get-Date).AddDays(3).Date.AddHours(16).ToString('yyyy-MM-ddTHH:mm:sszzz')
$turnoBody = @{ empresaId=1; unidadeId=3; setorId=1; nome='Turno Salao'; inicio=$inicio; fim=$fim } | ConvertTo-Json
$turno = Invoke-RestMethod -Method POST -Uri 'http://localhost:3004/v1/turnos' -Headers $headers -ContentType 'application/json' -Body $turnoBody
Write-Host "Turno: $($turno.id)"
$vagaBody = @{ funcao='Garcom'; quantidade=10; modalidade='TURNO'; valorBase=150; adicionalNoturno=0 } | ConvertTo-Json
$vaga = Invoke-RestMethod -Method POST -Uri "http://localhost:3004/v1/turnos/$($turno.id)/vagas" -Headers $headers -ContentType 'application/json' -Body $vagaBody
Write-Host "Vaga: $($vaga.id)"
Invoke-RestMethod -Method PATCH -Uri "http://localhost:3004/v1/turnos/$($turno.id)/publicar" -Headers $headers | ConvertTo-Json
Invoke-RestMethod -Method GET -Uri "http://localhost:3004/v1/turnos/$($turno.id)/projecao" -Headers $headers | ConvertTo-Json -Depth 10
# Alocacao opcional (requer freelancerId real):
# $body = @{ freelancerId=1 } | ConvertTo-Json
# Invoke-RestMethod -Method POST -Uri "http://localhost:3004/v1/vagas/$($vaga.id)/alocacoes" -Headers $headers -ContentType 'application/json' -Body $body

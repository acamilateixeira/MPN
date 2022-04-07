<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Auditoria;
use App\Cliente;
use App\Empresa;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function loginAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Falha ao validar dados',
                'erro' => $validator->errors(),
            ], 422);
        }

        $user = Admin::where('username', $request->username)
            ->where('password', hash('md5', $request->password))
            ->with('empresas')
            ->first();

        if (!$user) {
            return response()->json(['erro' => 'Credenciais inválidas.'], 401);
        }

        $empresa = Empresa::where('codEmpresa', $user->codEmpresa)
            ->first();

        if (!$empresa) {
            return response()->json(['erro' => 'Empresa não encontrada.'], 401);
        }

        if ($empresa->idAcesso !== '1') {
            return response()->json(['erro' => 'Empresa não autorizada verificar com o provedor do sistema.'], 401);
        }

        $session = Auditoria::create([
            'username' => $user->username,
            'codEmpresa' => $user->codEmpresa,
            'tokenGeradoEm' => Carbon::now()->toDateTimeString(),
            'tokenRevogadoEm' => Carbon::now()->addHour()->toDateTimeString(),
        ]);

        auth()->login($session, true);

        if (!$token = auth()->tokenById($session->id)) {
            return response()->json(['erro' => 'Falha ao gerar token.'], 401);
        } else {
            return response()->json([
                'message' => 'Login realizado com sucesso.',
                'usuario' => [
                    'username' => $user->username,
                    'codEmpresa' => $user->codEmpresa,
                    'nomeEmpresa' => $empresa->nomeRazaoSocial,
                ],
                'token' => $token,
            ], 200);
        }
    }

    public function loginCliente(Request $request, $codEmpresa)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Falha ao validar dados',
                'erro' => $validator->errors(),
            ], 422);
        }

        $user = Cliente::where('username', $request->username)
            ->where('password', hash('md5', $request->password))
            ->first();

        if (!$user) {
            return response()->json(['erro' => 'Credenciais inválidas.'], 401);
        }

        $empresa = Empresa::where('codEmpresa', $codEmpresa)
            ->where('idAcesso', 1)
            ->first();

        if (!$empresa) {
            return response()->json(['erro' => 'A empresa que está tentando conectar não está em nossos sistemas'], 401);
        }

        $session = Auditoria::create([
            'username' => $user->username,
            'codEmpresa' => $user->codEmpresa,
            'tokenGeradoEm' => Carbon::now()->toDateTimeString(),
            'tokenRevogadoEm' => Carbon::now()->addHour()->toDateTimeString(),
        ]);

        if (!$token = auth()->tokenById($session->id)) {
            return response()->json(['erro' => 'Falha ao gerar token.'], 401);
        } else {
            return response()->json([
                'message' => 'Login realizado com sucesso.',
                'token' => $token,
            ], 200);
        }
    }

    public function logout()
    {
        auth()->logout();
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
}

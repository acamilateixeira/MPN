<?php

namespace App\Http\Controllers;

use App\Horario;
use App\Servico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServicosController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->username === 'provedor') {
            return response()->json(
                Servico::with('empresa', 'horarios', 'agendas.cliente')
                    ->get(),
                200);
        } else {
            if (auth()->user()->codEmpresa !== "9999") {
                return response()->json(
                    Servico::with('empresa', 'horarios', 'agendas.cliente')
                        ->where('codEmpresa', auth()->user()->codEmpresa)
                        ->get(),
                    200);
            } else {
                if (!$request->codEmpresa) {
                    return response()->json([
                        'erro' => 'Não autorizado.',
                    ], 400);
                }

                $servicos = Servico::with('empresa', 'horarios')
                    ->where('codEmpresa', $request->codEmpresa)
                    ->get();

                return response()->json($servicos, 200);
            }
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'descricao' => 'required|string|max:100',
            'detalhes' => 'nullable|string|max:500',
            'valor' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $servico = Servico::create([
                'descricao' => $request->descricao,
                'valor' => $request->valor,
                'detalhes' => $request->detalhes,
                'codEmpresa' => auth()->user()->codEmpresa,
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar serviço.'], 400);
        }

        return response()->json([
            'message' => 'Serviço criado com sucesso.',
            'servicos' => Servico::paginate(5),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'descricao' => 'required|string|max:100',
            'valor' => 'required|numeric',
            'detalhes' => 'string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $servico = Servico::find($id);
            $servico->update([
                'descricao' => $request->descricao,
                'valor' => $request->valor,
                'detalhes' => $request->detalhes,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao atualizar serviço.'], 400);
        }

        return response()->json([
            'message' => 'Serviço atualizado com sucesso.',
            'servicos' => Servico::paginate(5),
        ], 201);
    }

    public function destroy($id)
    {
        try {
            $servicos = Servico::find($id);

            if (!$servicos) {
                return response()->json(['erro' => 'Serviço não encontrado.'], 400);
            }

        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao localizar serviço.'], 400);
        }

        if (auth()->user()->username === 'provedor') {
            $servicos->delete();
        } else {
            if ($servicos->codEmpresa !== auth()->user()->codEmpresa) {
                return response()->json(['erro' => 'Acesso negado.'], 400);
            }

            $servicos->update([
                'deletadoPor' => auth()->user()->username,
            ]);

            $servicos->delete();
        }

        $horarios = Horario::where('idServico', $id)->get();

        if (!$horarios->isEmpty()) {
            $horariosLiberados = [
                'horarios' => $horarios,
                'message' => 'Serviço excluído, mas existem horários associados a ele.',
            ];
        } else {
            $horariosLiberados = [
                'message' => 'Nenhum horário associado ao serviço.',
            ];
        };

        return response()->json([
            'message' => 'Serviço excluído com sucesso.',
            'servicos' => Servico::paginate(5),
            'horarios' => $horariosLiberados,
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class servicosController extends Controller
{
    public function index()
    {
        $servicos = DB::table('Servico')
            ->select('Servico.*')
            ->get();

        return response()->json($servicos);
    }
}

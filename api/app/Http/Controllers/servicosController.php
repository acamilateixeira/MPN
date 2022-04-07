<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ServicosController extends Controller
{
    public function index()
    {
        $servicos = DB::table('Servicos')
            ->select('Servicos.*')
            ->get();

        return response()->json($servicos);
    }
}

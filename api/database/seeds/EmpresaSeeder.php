<?php

use App\Empresa;
use Illuminate\Database\Seeder;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Empresa::create([
            'nomeRazaoSocial' => 'Provedor',
            'email' => 'camila.lulu@homail.com',
            'idAcesso' => 1,
            'codEmpresa' => 66027,
            'telefone' => '31989658128',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
        ]);
    }
}

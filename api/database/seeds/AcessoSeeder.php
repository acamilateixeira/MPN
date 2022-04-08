<?php

use App\Acesso;
use Illuminate\Database\Seeder;

class AcessoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Acesso::create([
            'descricao' => 'Ativo',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
            'deletadoPor' => null,
        ]);

        Acesso::create([
            'descricao' => 'Inativo',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
            'deletadoPor' => null,
        ]);

        Acesso::create([
            'descricao' => 'Bloqueado',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
            'deletadoPor' => null,
        ]);

        Acesso::create([
            'descricao' => 'Excluído',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
            'deletadoPor' => null,
        ]);
    }
}

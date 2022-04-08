<?php

use App\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::create([
            'descricao' => 'Agendado',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
        ]);

        Status::create([
            'descricao' => 'Cancelado',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
        ]);

        Status::create([
            'descricao' => 'Finalizado',
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
        ]);
    }
}

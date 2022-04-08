<?php

use App\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'cadastradoPor' => 'provedor',
            'atualizadoPor' => 'provedor',
            'codEmpresa' => 66027,
            'username' => 'provedor',
            'password' => hash('md5', 'provider$g@tm0'),
        ]);
    }
}

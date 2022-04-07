<?php

namespace App;

use App\Acesso;
use App\Agenda;
use App\Cliente;
use App\Horario;
use App\Servico;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa extends Model
{

    use SoftDeletes;

    protected $table = 'Empresas';
    protected $fillable = [
        'nomeRazaoSocial',
        'email',
        'telefone',
        'idAcesso',
        'username',
        'codEmpresa',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];

    public function acessos()
    {
        return $this->belongsTo(Acesso::class, 'idAcesso');
    }

    public function servicos()
    {
        return $this->hasMany(Servico::class, 'codEmpresa');
    }

    public function horarios()
    {
        return $this->hasMany(Horario::class, 'codEmpresa');
    }

    public function clientes()
    {
        return $this->belongsToMany(Cliente::class, 'Agenda', 'codEmpresa', 'idCliente');
    }

    public function agendas()
    {
        return $this->hasMany(Agenda::class, 'codEmpresa');
    }
}

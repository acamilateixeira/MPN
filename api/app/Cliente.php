<?php

namespace App;

use App\Agenda;
use App\Horario;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Cliente extends Authenticatable implements JWTSubject
{
    use SoftDeletes;

    protected $table = 'Clientes';
    protected $fillable = [
        'username',
        'nome',
        'email',
        'telefone',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];

    protected $hidden = [
        'password',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function agendamentos()
    {
        return $this->hasMany(Agenda::class, 'idCliente');
    }

    public function horarios()
    {
        return $this->belongsToMany(Horario::class, 'Agenda', 'idCliente', 'idHorario');
    }
}

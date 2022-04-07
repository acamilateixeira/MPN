<?php

namespace App;

use App\Empresa;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'Administradores';

    protected $fillable = [
        'username', 'codEmpresa', 'password', 'cadastradoPor', 'atualizadoPor', 'deletadoPor',
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

    public function empresas()
    {
        return $this->belongsTo(Empresa::class, 'codEmpresa');
    }
}

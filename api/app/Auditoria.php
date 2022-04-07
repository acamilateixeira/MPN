<?php

namespace App;

use Illuminate\Foundation\Auth\User;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Auditoria extends User implements JWTSubject
{
    public $timestamps = false;

    protected $table = 'Auditoria';

    protected $fillable = [
        'username',
        'codEmpresa',
        'tokenGeradoEm',
        'tokenRevogadoEm',
    ];

    protected $cast = [
        'codEmpresa' => 'integer',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

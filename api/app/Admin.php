<?php

namespace App;

use App\Empresa;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'Admin';

    protected $fillable = [
        'name', 'codEmpresa', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function empresas()
    {
        return $this->belongsTo(Empresa::class, 'codEmpresa');
    }
}

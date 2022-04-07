<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'Horario';
    protected $fillable = [
        'hora',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];
}

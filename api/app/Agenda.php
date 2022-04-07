<?php

namespace App;

use App\Cliente;
use App\Horario;
use App\Servico;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'Agenda';
    protected $fillable = [
        'cliente_id',
        'servico_id',
        'horario_id',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function servico()
    {
        return $this->belongsTo(Servico::class, 'servico_id');
    }

    public function horario()
    {
        return $this->belongsTo(Horario::class, 'horario_id');
    }
}

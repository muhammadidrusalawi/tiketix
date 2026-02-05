<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Event extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */

    protected $table = 'events';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'image_public_id',
        'location',
        'start_date',
        'end_date',
    ];

    protected static function booted()
    {
        static::creating(function ($event) {
            if (empty($event->id)) {
                $event->id = (string) Str::uuid();
            }

            if (empty($event->slug)) {
                $event->slug = static::generateUniqueSlug($event->name);
            }
        });

        static::updating(function ($event) {
            if ($event->isDirty('name')) {
                $event->slug = static::generateUniqueSlug($event->name, $event->id);
            }
        });
    }

    protected static function generateUniqueSlug(string $name, $ignoreId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $count = 1;

        while (
        static::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        return $slug;
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}

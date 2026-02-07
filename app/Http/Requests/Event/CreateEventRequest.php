<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class CreateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'image'       => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'location'    => 'required|string|max:255',

            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after:start_date',

            'tickets'              => 'required|array|min:1',
            'tickets.*.name'       => 'required|string|max:255',
            'tickets.*.price'      => 'required|integer|min:0',
            'tickets.*.stock'      => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama acara wajib diisi.',
            'name.max' => 'Nama acara maksimal 255 karakter.',

            'description.required' => 'Deskripsi acara wajib diisi.',

            'image.required' => 'Gambar acara wajib diunggah.',
            'image.image' => 'File harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal 2MB.',

            'location.required' => 'Lokasi acara wajib diisi.',

            'start_date.required' => 'Tanggal mulai wajib diisi.',
            'end_date.required' => 'Tanggal selesai wajib diisi.',
            'end_date.after' => 'Tanggal selesai harus setelah tanggal mulai.',

            'tickets.required' => 'Minimal harus ada satu tiket.',
            'tickets.array' => 'Format tiket tidak valid.',

            'tickets.*.name.required' => 'Nama tiket wajib diisi.',
            'tickets.*.price.required' => 'Harga tiket wajib diisi.',
            'tickets.*.price.integer' => 'Harga tiket harus berupa angka.',
            'tickets.*.stock.required' => 'Stok tiket wajib diisi.',
            'tickets.*.stock.min' => 'Stok tiket minimal 1.',
        ];
    }
}

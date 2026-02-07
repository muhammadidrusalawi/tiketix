<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
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
            'items' => 'required|array|min:1',
            'items.*.ticket_id' => 'required|exists:tickets,id',
            'items.*.quantity' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'items.required' => 'Pilih minimal 1 tiket.',
            'items.*.ticket_id.required' => 'Tiket tidak valid.',
            'items.*.ticket_id.exists' => 'Tiket tidak ditemukan.',
            'items.*.quantity.required' => 'Jumlah tiket harus diisi.',
            'items.*.quantity.min' => 'Jumlah tiket minimal 1.',
        ];
    }
}

import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function OrderCheckout() {
    const { order, snapToken } = usePage().props;

    const handlePay = () => {
        if (!window.snap) {
            alert('Midtrans Snap JS belum siap');
            return;
        }

        window.snap.pay(snapToken, {
            onSuccess: function(result){
                console.log('Pembayaran sukses:', result);
                window.location.href = route('order.success');
            },
            onPending: function(result){
                console.log('Pembayaran pending:', result);
            },
            onError: function(result){
                console.log('Pembayaran gagal:', result);
            },
            onClose: function(){
                alert('Anda menutup popup pembayaran tanpa menyelesaikan pembayaran');
            }
        });
    };

    const isProduction = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = isProduction
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js';

        script.setAttribute('data-client-key', clientKey);
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    }, []);


    return (
        <div className="p-6">
            <h1>Order {order.order_number}</h1>
            <p>Total: Rp {order.total_amount.toLocaleString('id-ID')}</p>
            <button
                onClick={handlePay}
                className="bg-blue-500 text-white px-6 py-3 rounded"
            >
                Bayar Sekarang
            </button>
        </div>
    );
}

import React from 'react';
import { useCart, useCurrency } from '../App';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartPageProps {
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onContinueShopping, onCheckout }) => {
  const { cartItems, updateQuantity, removeFromCart, itemCount } = useCart();
  const { formatPrice } = useCurrency();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Cotización</h1>

        {itemCount === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">Tu carrito está vacío</h2>
            <p className="mt-2 text-gray-600">Parece que aún no has añadido ningún producto. ¡Explora nuestro catálogo!</p>
            <button
              onClick={onContinueShopping}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#5a1e38] hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38]"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6 flex">
                      <div className="flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)} c/u</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-500 hover:text-gray-800"><Minus className="h-4 w-4" /></button>
                            <span className="w-10 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-500 hover:text-gray-800"><Plus className="h-4 w-4" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 p-1">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-28">
                <h2 className="text-lg font-medium text-gray-900">Resumen</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">{formatPrice(subtotal)}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">Total Estimado</p>
                    <p className="text-base font-medium text-gray-900">{formatPrice(subtotal)}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-[#5a1e38] border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38]"
                  >
                    Proceder a Cotizar
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button onClick={onContinueShopping} className="text-sm font-medium text-[#5a1e38] hover:text-[#4d182e]">
                    o Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;

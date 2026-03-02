import React, { useState, useEffect } from 'react';
import { Printer, Ruler, Hash, Info, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import logo from '../logo.png';

const Calculator = () => {
  const [mode, setMode] = useState<'unidad' | 'lineal'>('unidad');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [quantity, setQuantity] = useState(1);

  // Configuración
  const METER_PRICE = 50000;
  const ROLL_WIDTH = 58;
  const DISCOUNT_THRESHOLD = 10;
  const DISCOUNT_PERCENT = 0.20;

  const calculate = () => {
    let totalLinearMeters = 0;
    let baseTotal = 0;

    if (mode === 'lineal') {
      totalLinearMeters = (height / 100) * quantity;
      baseTotal = totalLinearMeters * METER_PRICE;
    } else {
      const areaMetroLineal = ROLL_WIDTH * 100;
      const areaUnidad = width * height;
      totalLinearMeters = (areaUnidad * quantity) / areaMetroLineal;
      baseTotal = (areaUnidad / areaMetroLineal) * METER_PRICE * quantity;
    }

    const hasDiscount = totalLinearMeters > DISCOUNT_THRESHOLD;
    const finalTotal = hasDiscount ? baseTotal * (1 - DISCOUNT_PERCENT) : baseTotal;
    const unitPrice = baseTotal / quantity;

    return {
      totalLinearMeters,
      baseTotal,
      finalTotal,
      unitPrice,
      hasDiscount
    };
  };

  const { totalLinearMeters, baseTotal, finalTotal, unitPrice, hasDiscount } = calculate();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 py-12">
      <Link 
        to="/" 
        className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-brand-accent transition-colors font-medium"
      >
        <ChevronLeft size={20} /> Volver al sitio
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100"
      >
        {/* Header */}
        <div className="bg-black p-8 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 bg-brand-accent text-white rotate-12 px-12 py-8 font-bold text-xs shadow-lg">
            ¡OFERTA! <br/> -20% +10m
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <img 
              src={logo} 
              alt="DTF Venado Logo" 
              className="h-8 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              Print Master Pro
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold">Calculadora DTF & UV</h1>
          <p className="text-zinc-400 text-sm mt-1">Precio Metro: <span className="text-white font-bold">{formatCurrency(METER_PRICE)}</span></p>
        </div>

        <div className="p-6 space-y-5">
          {/* Selector de Modo */}
          <div className="flex p-1 bg-zinc-100 rounded-xl">
            <button 
              onClick={() => setMode('unidad')} 
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'unidad' ? 'bg-white text-brand-accent shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Por Unidad
            </button>
            <button 
              onClick={() => setMode('lineal')} 
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'lineal' ? 'bg-white text-brand-accent shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Metro Lineal
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={mode === 'lineal' ? 'opacity-40 pointer-events-none' : ''}>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1 tracking-wider">Ancho (cm)</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input 
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1 tracking-wider">
                {mode === 'lineal' ? 'Largo (cm)' : 'Alto (cm)'}
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 rotate-90 w-4 h-4" />
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all" 
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1 tracking-wider">
              {mode === 'lineal' ? 'Cantidad de Tramos' : 'Cantidad de Unidades'}
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all" 
              />
            </div>
          </div>

          {/* Estado del Descuento */}
          <div className={`rounded-2xl p-4 flex gap-3 border transition-colors ${hasDiscount ? 'bg-green-50 border-green-100 text-green-700' : 'bg-brand-accent/5 border-brand-accent/10 text-brand-accent'}`}>
            <Info className="shrink-0 w-5 h-5" />
            <div className="text-xs leading-relaxed">
              {hasDiscount ? (
                <><strong>¡Descuento aplicado!</strong> Estás llevando {totalLinearMeters.toFixed(2)}m lineales. Se aplicó un 20% de descuento.</>
              ) : (
                <>Llevas <strong>{totalLinearMeters.toFixed(2)}m</strong>. Si superas los 10m, obtendrás un <strong>20% de descuento</strong> automático.</>
              )}
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-zinc-900 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800 mb-4">
              <span className="text-zinc-500 text-sm">
                {mode === 'lineal' ? 'Precio por tramo' : 'Precio por unidad'}
              </span>
              <span className="font-semibold text-lg">{formatCurrency(unitPrice)}</span>
            </div>
            
            <div className="space-y-1">
              <span className="block text-zinc-500 text-xs uppercase font-bold tracking-wider mb-2">Total del Pedido</span>
              
              <div className="flex flex-col">
                {hasDiscount && (
                  <span className="text-zinc-600 line-through text-lg decoration-brand-accent/50">
                    {formatCurrency(baseTotal)}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className={`text-4xl font-bold transition-colors ${hasDiscount ? 'text-green-400' : 'text-brand-accent'}`}>
                    {formatCurrency(finalTotal)}
                  </span>
                  {hasDiscount && (
                    <span className="bg-green-500 text-[10px] px-2 py-1 rounded text-white font-black animate-pulse">
                      PROMO -20%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 text-center border-t border-zinc-50">
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">
            Tarifa mayorista aplicada automáticamente
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Calculator;

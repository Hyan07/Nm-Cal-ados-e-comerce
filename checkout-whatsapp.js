const NM_WHATSAPP_NUMBER = '5535998935465';

function checkoutField(selector) {
  return document.querySelector(selector)?.value?.trim() || '';
}

function selectedDeliveryLabel() {
  const selected = document.querySelector('input[name="delivery"]:checked');
  const labels = {
    pickup: 'Retirar na loja',
    local: 'Entrega local — Carmo do Rio Claro e região',
    national: 'Envio nacional — Correios ou transportadora'
  };
  return labels[selected?.value] || 'Não informado';
}

function selectedPaymentLabel() {
  return document.querySelector('.payment-tabs button.active')?.textContent?.trim() || 'Não informado';
}

function validateCheckoutFields() {
  const requiredFields = [...document.querySelectorAll('.checkout-form input[required]')];
  const invalid = requiredFields.find(field => !field.checkValidity() || !field.value.trim());

  if (invalid) {
    invalid.focus();
    invalid.reportValidity();
    if (typeof toast === 'function') toast('Preencha os dados corretamente para continuar.');
    return false;
  }

  return true;
}

function buildWhatsAppOrderMessage() {
  const firstName = checkoutField('#checkoutFirstName');
  const lastName = checkoutField('#checkoutLastName');
  const email = checkoutField('#checkoutEmail');
  const cpf = checkoutField('#checkoutCpf');
  const phone = checkoutField('#checkoutPhone');
  const delivery = selectedDeliveryLabel();
  const payment = selectedPaymentLabel();
  const subtotal = typeof cartSubtotal === 'function' ? cartSubtotal() : 0;

  const itemLines = cart.map((item, index) => {
    const product = products.find(productItem => productItem.id == item.id);
    if (!product) return null;

    const size = item.size ? `\n   Tamanho: ${item.size}` : '';
    return [
      `*${index + 1}. ${product.name}*`,
      `   Marca: ${product.brand}${size}`,
      `   Quantidade: ${item.qty}`,
      `   Valor unitário: ${brl(product.price)}`,
      `   Total do item: ${brl(product.price * item.qty)}`
    ].join('\n');
  }).filter(Boolean).join('\n\n');

  return [
    '🛍️ *NOVO PEDIDO PELO SITE — NM CALÇADOS*',
    '',
    'Olá! Quero finalizar esta compra feita pelo site.',
    '',
    '*DADOS DO CLIENTE*',
    `Nome: ${firstName} ${lastName}`,
    `CPF: ${cpf}`,
    `Celular: ${phone}`,
    `E-mail: ${email}`,
    '',
    '*ITENS DO PEDIDO*',
    itemLines,
    '',
    '*RESUMO*',
    `Subtotal: ${brl(subtotal)}`,
    `Frete: ${delivery.startsWith('Retirar') ? 'R$ 0,00' : 'A confirmar pela loja'}`,
    `Total dos produtos: ${brl(subtotal)}`,
    '',
    '*ENTREGA*',
    delivery,
    '',
    '*FORMA DE PAGAMENTO ESCOLHIDA*',
    payment,
    '',
    '📌 *Pedido enviado pelo site.*',
    'Por favor, confirmem a disponibilidade dos itens e, quando necessário, o frete e os dados para pagamento.'
  ].join('\n');
}

function finishOrderOnWhatsApp(event) {
  if (event) event.preventDefault();

  if (!cart.length) {
    if (typeof toast === 'function') toast('Adicione produtos antes de finalizar.');
    return;
  }

  if (!validateCheckoutFields()) return;

  const message = buildWhatsAppOrderMessage();
  const whatsappUrl = `https://wa.me/${NM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappUrl;
}

const whatsappFinishButton = document.querySelector('#fakeFinish');
if (whatsappFinishButton) {
  whatsappFinishButton.textContent = 'Finalizar pelo WhatsApp';
  whatsappFinishButton.addEventListener('click', finishOrderOnWhatsApp);
}

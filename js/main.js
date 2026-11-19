/* =========================================================
   js/main.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('order-dialog');
  const closeBtn = document.getElementById('close-order-dialog');
  const form = document.getElementById('order-form');
  const selectedProductInput = document.getElementById('selected-product');
  const successMessage = document.getElementById('success-message');
  const toTopBtn = document.getElementById('to-top');

  /* ---------- 1. Открытие модального окна ---------- */
  const orderButtons = document.querySelectorAll('.product-card__button');
  orderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productName = btn.dataset.product || 'Товар';

      if (selectedProductInput) {
        selectedProductInput.value = productName;
      }
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  /* ---------- 2. Закрытие модального окна ---------- */
  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => {
      dialog.close();
    });
  }

  /* ---------- 3. Валидация формы в модальном окне ---------- */
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      form.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
        el.removeAttribute('aria-invalid');
      });

      let isValid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          isValid = false;
        }
      });

      if (!isValid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (dialog && dialog.open) {
        dialog.close();
      }

      form.reset();

      if (successMessage) {
        successMessage.hidden = false;
        setTimeout(() => {
          successMessage.hidden = true;
        }, 4000);
      }
    });
  }

  /* ---------- 3.1. Форма на странице order.html ---------- */
  const pageForm = document.getElementById('order-form-page');
  const pageSuccess = document.getElementById('success-message-page');

  if (pageForm) {
    pageForm.addEventListener('submit', (event) => {
      event.preventDefault();

      pageForm.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
        el.removeAttribute('aria-invalid');
      });

      let isValid = true;

      pageForm.querySelectorAll('[required]').forEach((field) => {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          isValid = false;
        }
      });

      if (!isValid) {
        const firstInvalid = pageForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      pageForm.reset();

      if (pageSuccess) {
        pageSuccess.hidden = false;
        setTimeout(() => {
          pageSuccess.hidden = true;
        }, 4000);
      }
    });
  }

  /* ---------- 4. Кнопка «Наверх» ---------- */
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        toTopBtn.classList.add('to-top--visible');
      } else {
        toTopBtn.classList.remove('to-top--visible');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/*
console.log('Файл main.js подключён');
console.log(product);
console.table(product);

function formatPrice(price) {
  return `${price} руб.`;
}

console.log(formatPrice(product.price));

function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

const discountValue = calculateDiscount(product.price, product.discountPercent);

console.log(discountValue);

function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

const finalPrice = calculateFinalPrice(product.price, product.discountPercent);

console.log(finalPrice);

function getProductStatus(product) {
  if (product.isAvailable) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

console.log(getProductStatus(product));

function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const status = getProductStatus(product);

  return `${product.title}: ${formatPrice(finalPrice)}. Статус: ${status}.`;
}

const productSummary = createProductSummary(product);

console.log(productSummary);

const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
  messageElement.textContent = 'JavaScript подключён корректно.';
}

if (productOutputElement) {
  productOutputElement.textContent = productSummary;
}
*/

console.log('Файл main.js подключён');
console.log(products);
console.table(products);

function getProductTitles(products) {
  return products.map((product) => product.title);
}

function getAvailableProducts(products) {
  return products.filter((product) => product.isAvailable);
}

function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return products;
  }

  return products.filter((product) => {
    return product.title.toLowerCase().includes(normalizedQuery);
  });
}

function filterProductsByCategory(products, category) {
  if (category === 'all') {
    return products;
  }

  return products.filter((product) => {
    return product.category === category;
  });
}

function sortProductsByPrice(products, direction = 'asc') {
  const productsCopy = [...products];

  if (direction === 'desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }

  return productsCopy.sort((a, b) => a.price - b.price);
}

function findProductById(products, id) {
  return products.find((product) => product.id === id);
}

function calculateTotalPrice(products) {
  return products.reduce((sum, product) => {
    return sum + product.price;
  }, 0);
}

function countAvailableProducts(products) {
  return products.filter((product) => product.isAvailable).length;
}

function calculateAveragePrice(products) {
  if (products.length === 0) {
    return 0;
  }

  const totalPrice = calculateTotalPrice(products);
  return Math.round(totalPrice / products.length);
}

function getPreparedProducts(products, query, category, sortDirection) {
  let result = [...products];

  result = searchProducts(result, query);
  result = filterProductsByCategory(result, category);
  result = sortProductsByPrice(result, sortDirection);

  return result;
}

console.log(getProductTitles(products));
console.table(getAvailableProducts(products));
console.table(searchProducts(products, 'плитка'));
console.table(filterProductsByCategory(products, 'building'));
console.table(sortProductsByPrice(products, 'asc'));
console.log(findProductById(products, 3));
console.log(calculateTotalPrice(products));
console.log(countAvailableProducts(products));
console.log(calculateAveragePrice(products));
console.table(getPreparedProducts(products, 'плитка', 'building', 'asc'));

const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
  messageElement.textContent = 'Массив товаров и функции обработки данных подключены.';
}

if (productOutputElement) {
  productOutputElement.textContent = [
    `Всего товаров: ${products.length}`,
    `Товаров в наличии: ${countAvailableProducts(products)}`,
    `Средняя цена: ${calculateAveragePrice(products)} руб.`,
    `Результатов поиска "плитка": ${searchProducts(products, 'плитка').length}`
  ].join('\n');
}

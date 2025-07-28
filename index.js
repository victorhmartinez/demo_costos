 let activeSection = 'info';
    
    function switchSection(sectionId) {
      // Ocultar la sección actual
      document.getElementById(`section-${activeSection}`).classList.remove('active');
      // Mostrar la nueva sección
      document.getElementById(`section-${sectionId}`).classList.add('active');
      // Actualizar la sección activa
      activeSection = sectionId;
      
      // Actualizar botones de navegación
      document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
      });
      
      if (sectionId === 'info') {
        document.getElementById('btn-info').classList.add('active');
      } else if (sectionId === 'costs') {
        document.getElementById('btn-costs').classList.add('active');
      } else if (sectionId === 'intelligence') {
        document.getElementById('btn-intelligence').classList.add('active');
      }
    }
    
    // Fixed Costs Functionality
    const container = document.getElementById('cost-items-container');
    const addItemButton = document.getElementById('add-cost-btn');
    const analyzeButton = document.getElementById('analyze-btn');
    const totalCostElement = document.getElementById('total-cost');
    
    function createCostItem() {
      const newItem = document.createElement('div');
      newItem.className = 'cost-item flex gap-3 items-start';
      newItem.innerHTML = `
        <div class="flex-1">
          <input
            type="text"
            placeholder="Nombre del costo (ej: Alquiler)"
            class="cost-name w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div class="w-32">
          <input
            type="number"
            placeholder="Monto"
            class="cost-amount w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div class="flex items-center pt-3">
          <button
            type="button"
            class="remove-item p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      `;
      return newItem;
    }
    
    addItemButton.addEventListener('click', () => {
       const newItem = createCostItem();
       container.appendChild(newItem);
       attachRemoveListener(newItem);
       updateTotalCost();
    });
    
    function attachRemoveListener(itemElement) {
       const removeButton = itemElement.querySelector('.remove-item');
       removeButton.addEventListener('click', () => {
           if (container.children.length > 1) {
               itemElement.remove();
               updateTotalCost();
           }
       });
    }
    
    attachRemoveListener(container.querySelector('.cost-item'));
    
    function updateTotalCost() {
        let total = 0;
        document.querySelectorAll('.cost-item').forEach(item => {
            const amountInput = item.querySelector('.cost-amount');
            const amount = parseFloat(amountInput.value) || 0;
            total += amount;
        });
        totalCostElement.textContent = `$${total.toFixed(2)}`;
    }
    
    container.addEventListener('input', (e) => {
        if (e.target.classList.contains('cost-amount')) {
            updateTotalCost();
        }
    });
    
    // Cambiar a la sección de resultados IA
    analyzeButton.addEventListener('click', () => {
    analizarCostos();
  switchSection("intelligence");
    });
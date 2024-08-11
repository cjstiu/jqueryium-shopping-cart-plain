$(document).ready(function() {
    // Function to calculate and update the subtotal for each item
    function updateSubtotal(row) {
      var price = Number(row.find('.price').text().replace('$', ''));
      var quantity = Number(row.find('input[type="number"]').val());
      var subtotal = price * quantity;
      row.find('.subtotal').text(`$${subtotal.toFixed(2)}`);
      updateTotal();
    }
  
    // Function to update the total price
    function updateTotal() {
      var total = 0;
      $('.subtotal').each(function() {
        total += Number($(this).text().replace('$', ''));
      });
      $('h2:contains("Total Price")').next().text(`$${total.toFixed(2)}`);
    }
  
    // Event listener for quantity input changes with 1-second delay
    $(document).on('input', '.quantity input[type="number"]', function() {
      var row = $(this).parents('tr');
      clearTimeout($.data(this, 'timer'));
      var wait = setTimeout(function() {
        updateSubtotal(row);
      }, 1000);
      $(this).data('timer', wait);
    });
  
    // Event listener for removing an item
    $(document).on('click', '.remove', function() {
      $(this).parents('tr').remove();
      updateTotal();
    });
  
    // Event listener for adding a new item
    $('#add').on('submit', function(event) {
      event.preventDefault();
      
      var itemName = $(this).find('input[type="text"]').val();
      var itemPrice = Number($(this).find('input[type="number"]').val()).toFixed(2);
      var itemQuantity = 1;
      var itemSubtotal = itemPrice * itemQuantity;
  
      // Append new row to the table
      var newRow = `
        <tr>
          <td class="item">${itemName}</td>
          <td class="price">$${itemPrice}</td>
          <td class="quantity">
            <label>QTY</label>
            <input type="number" min="0" value="${itemQuantity}">
            <button class="btn remove">Remove</button>
          </td>
          <td class="subtotal">$${itemSubtotal.toFixed(2)}</td>
        </tr>
      `;
      $('table tbody').append(newRow);
      
      // Update total
      updateTotal();
  
      // Reset form fields
      $(this).find('input[type="text"]').val('');
      $(this).find('input[type="number"]').val('');
    });
  });
  
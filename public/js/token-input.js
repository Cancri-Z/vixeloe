const tokenFields = document.querySelectorAll('.token-field');

tokenFields.forEach((field, index) => {
  field.addEventListener('input', (event) => {
    const value = event.target.value;
    if (value.length === 1) {
      if (index < tokenFields.length - 1) {
        tokenFields[index + 1].focus();
      } else {
        tokenFields[index].blur();
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get all token fields
  const tokenFields = document.querySelectorAll('.token-field');
  
  // Clear the value of each token field
  tokenFields.forEach(function(field) {
    field.value = '';
  });
});

tokenFields.forEach((field, index) => {
  field.addEventListener('input', (event) => {
    const value = event.target.value;
    if (value.length === 1) {
      if (index < tokenFields.length - 1) {
        tokenFields[index + 1].focus();
      } else {
        tokenFields[index].blur();
      }
    } else if (value.length === 0 && event.inputType === 'deleteContentBackward') {
      if (index > 0) {
        tokenFields[index - 1].focus();
      }
    }
  });
});
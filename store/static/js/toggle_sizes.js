document.addEventListener('DOMContentLoaded', function() {
    const productTypeField = document.getElementById('id_product_type');
    const sizesField = document.getElementById('id_sizes');

    const toggleSizeOptions = () => {
        const selectedType = productTypeField.value;
        const allSizeOptions = sizesField.querySelectorAll('option');

        allSizeOptions.forEach(option => {
            option.style.display = 'none';  // Hide all options initially
            if (selectedType === 'TS' && ['S', 'M', 'L', 'XL', 'XXL'].includes(option.value)) {
                option.style.display = 'block';  // Show T-shirt sizes
            } else if (selectedType === 'SH' && option.value.match(/^(3|4|5|6|7|8|9|10|11|12|13|14)$/)) {
                option.style.display = 'block';  // Show shoe sizes
            }
        });
    };

    productTypeField.addEventListener('change', toggleSizeOptions);
    toggleSizeOptions();  // Call on load to set the initial state
});

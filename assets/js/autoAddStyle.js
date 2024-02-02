fetch('./php/serchCss.php')
.then(response => response.json())
.then(styles => {
    // Добавляем опции в выпадающий список
    styles.forEach(style => {
        var option = document.createElement('option');
        option.value = style.file.replace('.css', ''); // Имя файла без расширения
        option.text = style.name;
        styleSelector.add(option);
    });
    changeStyle();
})
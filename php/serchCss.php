<?php
$styles = [];

// Укажите путь к директории с CSS файлами
$cssDirectory = '../assets/css/auto';

// Получаем список файлов в директории
$files = scandir($cssDirectory);

// Проходим по каждому файлу
foreach ($files as $file) {
    $filePath = $cssDirectory . '/' . $file;

    // Проверяем, является ли файл CSS
    if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
        // Читаем содержимое файла
        $content = file_get_contents($filePath);

        // Проверяем, есть ли закомментированная строка с именем стиля
        if (preg_match('/\/\*\s*name:\s*(.*?)\s*\*\//', $content, $matches)) {
            $styleName = $matches[1];
            $styles[] = ['name' => $styleName, 'file' => $file];
        }
    }
}

// Возвращаем результат в формате JSON
echo json_encode($styles);
?>
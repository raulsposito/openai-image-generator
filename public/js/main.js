async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();

        const imageUrl = data.data;

        document.querySelector('#image').src = imageUrl;

        removeSpinner();

    } catch (error) {
        document.querySelector('.header').textContent = error;
    }
}

// TODO: still need to connect this with the onSubmit and create a file stream for the image.
async function generateImageVariation(imageSource, size) {
    try {
        showSpinner();

        console.log(imageSource);

        const response = await fetch('/openai/generatevariation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageSource,
                size
            })
        })

        if (!response.ok) {
            removeSpinner();
            throw new Error('The image could not be processed');
        }

        const data = await response.json();


        const imageUrl = data.data;

        document.querySelector('#image').src = imageUrl;

        removeSpinner();

    } catch (error) {
        document.querySelector('.header').textContent = error;
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

function onSubmit(e) {
    e.preventDefault();

    document.querySelector('#input').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#input').value
    const size = document.querySelector('#size').value

    if (prompt === '') {
        alert('Please add some text to begin');
        return;
    }
    
    generateImageRequest(prompt, size);
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);

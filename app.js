const shortenBtn = document.getElementById('shorten');
const linkInput = document.getElementById('linkInput');
let textError = document.querySelector('.hidden');
const benefits = document.querySelector('.benefits')

function makeTheLongLinkAShortLink() {
    textError.style.display = 'none';
    linkInput.style.outline = '0';
    if (linkInput.value == '') {
        linkInput.style.outline = '3px solid var(--clr-secondary-red)';
        textError.style.display = 'block';
        return
    }
    let div = document.createElement('div');
    div.classList.add('addedContainer')
    let originalLink = document.createElement('p');
    originalLink.classList.add('https');
    let shortLink = document.createElement('p');
    shortLink.classList.add('shorthttps');
    let copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.id = 'copy';
    copyBtn.addEventListener('click', () => {
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = 'var(--clr-primary-dark-violet)'
        // from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
        navigator.clipboard.writeText(shortLink.textContent);
    })
    
    axios
        .get('https://api.shrtco.de/v2/shorten?url=' + linkInput.value)
        .then(response => {
            originalLink.textContent = response.data.result.original_link;
            shortLink.textContent = response.data.result.full_short_link;
            div.append(originalLink);
            div.append(shortLink);
            div.append(copyBtn);
            if (originalLink.textContent != '' || shortLink.textContent != '') {
                benefits.insertBefore(div, benefits.children[1]);
                linkInput.value = ''
            }        
        });


    
   
    

    linkInput.value = ''
    return
};
shortenBtn.addEventListener('click', makeTheLongLinkAShortLink);


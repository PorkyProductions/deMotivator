document.body.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === "p") {
        alert(`
        
        
            Porky finds great strength with you.
            You have found the most secret of secrets.
            For this, you deserve the world.
            However, porky is never that generous, so you won't be recieveing it.
            However, you may take this token of our appreciation
            💖
            Now go, and stand amongst the shoulders of giants.
        
        `)
    } else if (e.key === "s") {
        document.body.classList.add('spin')
    }
})

export{}
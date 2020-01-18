function makePixels(value) {
    return `${value}px`
}

const STANDARD_TOOLTIP_OFFSET = 16

function setTooltipPosition(tooltip, element) {
    const elementRect = element.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    const topOffset = elementRect.y - tooltipRect.height - STANDARD_TOOLTIP_OFFSET
    const isTopAvailable = topOffset > 0

    if (isTopAvailable) {
        const leftOffset = element.clientLeft
        tooltip.style.top = makePixels(topOffset)
        tooltip.style.left = makePixels(leftOffset)
        tooltip.classList.add('tooltip-top')
        return
    }

    const rightOffset = elementRect.x + elementRect.width + STANDARD_TOOLTIP_OFFSET
    const isRightAvailable = rightOffset + tooltipRect.width < document.body.clientWidth

    if (isRightAvailable) {
        tooltip.style.top = makePixels(elementRect.y)
        tooltip.style.left = makePixels(rightOffset)
        tooltip.classList.add('tooltip-left')
        return
    }

    const leftOffset = elementRect.x - tooltipRect.width - STANDARD_TOOLTIP_OFFSET
    const isLeftAvailable = leftOffset >= 0
    if (isLeftAvailable) {
        tooltip.style.top = makePixels(elementRect.y)
        tooltip.style.left = makePixels(leftOffset)
        tooltip.classList.add('tooltip-right')
        return
    }

    tooltip.style.top = makePixels(elementRect.y + elementRect.height + STANDARD_TOOLTIP_OFFSET)
    tooltip.style.left = makePixels(elementRect.x + elementRect.width / 2 - tooltipRect.width / 2)
    tooltip.classList.add('tooltip-bottom')
}

function $(selector) {
    let _tooltipContainer

    this.element = selector[0] === '#'
        ? document.getElementById(selector.slice(1, selector.length))
        : document.querySelectorAll(selector);

    const hideTooltip = () => {
        document.body.removeChild(_tooltipContainer)
        _tooltipContainer = null
    }

    this.showTooltip = ({ Title, Content, onApprove }) => {
        const tooltipContainer = document.createElement('div')
        tooltipContainer.classList = ['tooltip']
        tooltipContainer.id = 'tooltip'

        const tooltipHeader = document.createElement('h3')
        tooltipHeader.classList = ['tooltip__header']
        tooltipHeader.innerText = Title

        const tooltipContent = document.createElement('p')
        tooltipContent.innerText = Content
        tooltipContent.classList = ['tooltip__content']

        const tooltipButton = document.createElement('button')
        tooltipButton.type = 'button'
        tooltipButton.classList = ['tooltip__button']
        tooltipButton.title = 'Okay'
        tooltipButton.innerText = 'Okay'
        tooltipButton.onclick = (ev) => {
            onApprove()
            hideTooltip()
        }

        const elements = [tooltipHeader, tooltipContent, tooltipButton]
        elements.forEach(element => {
            tooltipContainer.appendChild(element)
        })

        _tooltipContainer = tooltipContainer
        document.body.appendChild(tooltipContainer)

        setTooltipPosition(tooltipContainer, this.element)

        tooltipContainer.classList.add('visible')
    }

    return this
}

button1.addEventListener('click', () => {
    $('#button1').showTooltip({
        Title: 'Some title1',
        Content: 'Some content1',
        onApprove: (ev) => {
            console.log('Append clicked!')
        }
    })
})

button2.addEventListener('click', () => {
    $('#button2').showTooltip({
        Title: 'Some title2',
        Content: 'Some content2',
        onApprove: (ev) => {
            console.log('Append clicked!!')
        }
    })
})

button3.addEventListener('click', () => {
    $('#button3').showTooltip({
        Title: 'Some title3',
        Content: 'Some content3',
        onApprove: (ev) => {
            console.log('Append clicked!!!')
        }
    })
})


button4.addEventListener('click', () => {
    $('#button4').showTooltip({
        Title: 'Some title4',
        Content: 'Some content4',
        onApprove: (ev) => {
            console.log('Append clicked!!!')
        }
    })
})

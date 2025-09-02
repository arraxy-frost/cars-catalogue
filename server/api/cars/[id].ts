import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    if (!id) return { error: 'No ID provided' }

    const res = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModel&model=${id}`)
    const data = await res.json()

    return data[0]
})

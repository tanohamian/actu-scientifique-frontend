'use client'

import { useParams } from "next/navigation"

export default function DetailsProduct() {
    const params = useParams()
    const productId = params.id
    return (
        <div>
            <h1>Details Product {productId}</h1>
        </div>
    )
}
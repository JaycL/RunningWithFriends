export function mapRefWithDescDTO(row) {
    return {
        Id: row.id,
        Name: row.name,
        Description: row.description,
        Icone: row.icone ?? null
    }
}

export function mapRefWithAbrDTO(row) {
    return {
        Id: row.id,
        Name: row.name,
        Abbreviation: row.abbreviation
    }
}


export function toCompanyImagesDir(companyId?: string) {
    if (!companyId) {
        return "avatar/default.png";
    }
    const dir = `avatar/${companyId}.png`;
    return dir;
}


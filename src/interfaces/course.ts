interface Post {
    title: string,
    visibility: string,
    thumbnailUrl?: string,
    contentType: "video" | "assignment" | "quiz",
    description: string,
    bucketVideoUrl?: string,
    postMaterials?: {
        title: string,
        type: "pdf" | "image" | "docx" | "pptx" | "xlsx" | "html" | "dotx" | "epub" | "webp" | "gdoc" | "mp3" | "doc" | "txt" | "zip" | "ppt" | "key" | "htm" | "xls" | "odp" | "odt" | "rtf" | "m4a" | "ods" | "mp4" | "ai" | "avi" | "mov" | "wmv" | "mkv" | "wav" | "flac" | "ogg" | "png" | "jpeg" | "jpg" | "gif" | "bmp" | "tiff" | "svg" | "odg" | "sxw" | "sxc" | "sxi" | "rar" | "7z" | "json" | "xml" | "csv" | "md" | "obj" | "stl" | "woff" | "ttf",
        url: string
    }[]
}

interface SubCategory {
    title: string,
    visibility: string,
    thumbnailUrl?: string,
    posts: Post[]
}

interface Product {
    title: string,
    description: string,
    imageUrl?: string,
    categories: [
        {
            title: string,
            visibility: string,
            thumbnailUrl?: string,
            posts: Post[],
            subCategories: SubCategory[]
        }
    ],
    instructorDetails: {
        name: string,
        description: string
    }
}

export interface ICourse {
    locationId: string,
    userId?: string,
    products: Product[]
}
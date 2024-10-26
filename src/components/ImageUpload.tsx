import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

interface ImageUploadProps {
    onUpload: (file: File | FileList) => void
    preview?: string | string[] | null
    multiple?: boolean
    onDelete?: (index: number) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload,preview,multiple,onDelete }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (multiple) {
                onUpload(e.target.files)
            } else {
                onUpload(e.target.files[0])
            }
        }
    }

    return (
        <div>
            <Input type="file" onChange={handleFileChange} multiple={multiple} />
            {preview && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {Array.isArray(preview) ? (
                        preview.map((url,index) => (
                            <div key={index} className="relative">
                                <img src={url} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
                                {onDelete && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-0 right-0"
                                        onClick={() => onDelete(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
                    )}
                </div>
            )}
        </div>
    )
}

export default ImageUpload

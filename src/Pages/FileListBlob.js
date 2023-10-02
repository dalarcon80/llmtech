import { useState, useEffect } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import ReciclerViewFiles from "../Components/ReciclerViewFiles";

const account ='sallmpocecpsbx'
//const sasToken = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-09T21:14:13Z&st=2023-08-08T13:14:13Z&spr=https&sig=nAnCwhrzqe2AQD58U3rq8aHu4HCHx5IvsFV6WtsFyGA%3D'
//const sasToken = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-12T04:54:39Z&st=2023-08-09T20:54:39Z&spr=https&sig=o0MiOiBTuNb2tdbq4wlkvZE74RKkUOytLYCiaYj4ByE%3D'
const sasToken =  '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-11T05:40:47Z&st=2023-08-09T21:40:47Z&spr=https&sig=PEX1SoRb4uzgmW3MzgOv%2FgHawtD8QgwicJKnnpBUy0A%3D'
const containerName = 'bronze'
const blobService = new BlobServiceClient(`https://${account}.blob.core.windows.net${sasToken}`)

function FileList(){
    const [FileName,setFileName] = useState([])

    useEffect(()=>{
        const getFiles = async ()=> {
            const containerClient = blobService.getContainerClient('bronze')
            let blobs = []
            for await (const blob of containerClient.listBlobsFlat()){
                if(blob.name.endsWith('.pdf')){
                    const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
                    const downloadUrl = blockBlobClient.url
                    //blobs.push(blob.name)
                    blobs.push({
                        name: blob.name,
                        downloadUrl
                    })
                }
            }
            setFileName(blobs)
        }
        getFiles();

    },[])
    return (
        <ul>
            {
                <ReciclerViewFiles FileName = {FileName}/>
            }
        </ul>

    )

}

export default FileList;

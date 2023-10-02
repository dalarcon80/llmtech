import React, {useState,useEffect} from 'react';
import { BlockBlobClient } from '@azure/storage-blob';
import {FixedSizeList} from 'react-window'

const { BlobServiceClient } = require("@azure/storage-blob");

async function downloadBlob(blob){
    console.log(blob)
}


function DownloadListDocuments(){
    const [titles,setTitles] = useState([ {autor: 'test 1', title:"test2"}]);
    const [blobs,setBlobs] = useState([]);

    {console.log(titles.length)}

    useEffect(() =>{
        async function fetchData(){
            const account ='sallmpocecpsbx'
            const sasToken = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-09T21:14:13Z&st=2023-08-08T13:14:13Z&spr=https&sig=nAnCwhrzqe2AQD58U3rq8aHu4HCHx5IvsFV6WtsFyGA%3D'
            const containerName = 'bronze'


            //const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sasToken}`);
            //const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sasToken}`)
            const containerClient = blobServiceClient.getContainerClient('bronze')

            let blobList = []
            for await (const blob of containerClient.listBlobsFlat()){
                blobList.push(blob);
            }
            setBlobs(blobList);
        }
        fetchData();
    },[])



    return(
        <FixedSizeList
          height={500}
          width={300}
          itemSize={50}
          itemCount={titles.length}
        >

            {

                ({index,style}) => {(
                   
                    <div style={style}>
                        <a href={blobs[index].url}>{blobs[index].name}</a>
                        <button onClick={()=> downloadBlob(blobs[index])}>
                            Download
                        </button>
                    </div>
                )
                }
            }

        </FixedSizeList>
        
    )
}

export default DownloadListDocuments
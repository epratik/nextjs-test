import { LinkPreviewService } from "../../services/LinkPreviewService";

export default async function handler(req, res) {
  
  let url = req.query.url 
  const previewService = await new LinkPreviewService();
  const preview =await previewService.getMetaData(url)
  res.status(200).json(preview)
}

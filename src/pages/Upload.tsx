function Upload() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Post</h2>
      </div>
      <Card className="rounded-2xl shadow-sm border-0 bg-white">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Select Photo</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              {selectedPhoto ? (
                <div className="space-y-4">
                  <img
                    src={selectedPhoto || "/placeholder.svg"}
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-xl mx-auto"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPhoto(null)}
                    className="rounded-xl"
                  >
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <Label htmlFor="photo-upload" className="cursor-pointer">
                      <Button variant="outline" className="rounded-xl" asChild>
                        <span>Choose Photo</span>
                      </Button>
                    </Label>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={() => {}}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption" className="text-gray-700">
              Caption
            </Label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-pink-300 focus:ring-pink-200 resize-none"
              rows={3}
            />
          </div>
          <Button
            onClick={() => {}}
            disabled={!selectedPhoto}
            className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-2.5"
          >
            Share Post
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Upload;

class AddAttachmentBoatPhotoToBoats < ActiveRecord::Migration
  def self.up
    change_table :boats do |t|
      t.attachment :boat_photo
    end
  end

  def self.down
    remove_attachment :boats, :boat_photo
  end
end

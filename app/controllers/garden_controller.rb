class GardenController < ApplicationController
  WIDTH = 10
  HEIGHT = 10
  
  def create
    @garden = Garden.create(width: WIDTH, height: HEIGHT)
    render :show
  end
  
  def show
    @garden = Garden.find(params[:id])
    if @garden
      render :show
    else
      render json: ["No garden!"], status: 404
  end
end

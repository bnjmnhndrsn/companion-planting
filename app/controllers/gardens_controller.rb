class GardensController < ApplicationController
  WIDTH = 10
  HEIGHT = 10

  def create
    @garden = Garden.create(width: WIDTH, height: HEIGHT, title: garden_params[:title])
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

  def index
    @gardens = Garden.all
  end

  private
    def garden_params
      params.permit(:id, :height, :width, :title)
    end

end

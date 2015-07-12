class GardensController < ApplicationController
  def create
    @garden = Garden.new(garden_params)
    if @garden.save
      render :show
    else
      render json: @garden.errors.full_messages, status: :unprocessable_entity
    end
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

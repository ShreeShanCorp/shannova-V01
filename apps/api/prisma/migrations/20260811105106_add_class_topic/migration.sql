-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "calendarEventId" TEXT,
ADD COLUMN     "topicId" TEXT;

-- CreateIndex
CREATE INDEX "classes_topicId_idx" ON "classes"("topicId");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
